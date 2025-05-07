using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class Glow2 : MonoBehaviour
{
    private Color startColor;
    private bool alreadyClicked;
    //public GameObject plane;
    //public Material door;
    public Material tinted;
    public Material clear;
    private Renderer renderer;
    private Material[] materials;
    public int clueID;
    private GameObject[] counters = new GameObject[3];
    //public var yellow;
    // Start is called before the first frame update
    void Start()
    {
        
        if (GameObject.Find("NoFear Counter 1") != null)
        {
            counters[0] = GameObject.Find("NoFear Counter 1");
        }
        if (GameObject.Find("NoFear Counter 2") != null)
        {
            counters[1] = GameObject.Find("NoFear Counter 2");
        }
        if (GameObject.Find("NoFear Counter 3") != null)
        {
            counters[2] = GameObject.Find("NoFear Counter 3");
        }
        renderer = GetComponent<Renderer>();
        materials = renderer.materials;
        materials[1] = clear;
        renderer.materials = materials;
    }

    // Update is called once per frame
    void Update()
    {

    }

    void OnMouseEnter()
    {
        if (DBManager.cluesClicked[clueID - 1] == 1)
        {
            alreadyClicked = true;
        }
        bool countersEmpty = true;
        for (int i = 0; i < counters.Length; i++)
        {
            if (counters[i] != null)
            {
                if (counters[i].GetComponentInChildren<TMP_Text>().text != "" && !(counters[i].GetComponentInChildren<CountingTypes3>().allFound()))
                {
                    countersEmpty = false;
                    break;
                }
            }
        }
        if (!alreadyClicked && countersEmpty)
        {
            renderer = GetComponent<Renderer>();
            materials = renderer.materials;
            materials[1] = tinted;
            renderer.materials = materials;
            //Destroy(plane);
            Debug.Log("Over");
            Debug.Log(alreadyClicked);
            //tempColor.a = 100;
            //GetComponent<Renderer>().materials[1].color = tempColor;

            //GetComponent<Renderer>().materials[1] = tinted;
        }



    }

    void OnMouseExit()
    {
        //Debug.Log("Off");
        renderer = GetComponent<Renderer>();
        materials = renderer.materials;
        materials[1] = clear;
        renderer.materials = materials;
    }


    void OnMouseDown()
    {
        if (materials[1] == tinted)
        {
            alreadyClicked = true;
        }
        //Destroy(plane);
        //.Log("Over");
        //GameObject().Destroy;
        //GetComponent<Renderer>().material.color = new Color(1, 0, 0, 1);
    }
}