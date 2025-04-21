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
    private GameObject counter;
    private TMP_Text text;
    private Renderer renderer;
    private Material[] materials;
    //public var yellow;
    // Start is called before the first frame update
    void Start()
    {
        if (GameObject.Find("STINFO Counter") != null)
        {
            counter = GameObject.Find("STINFO Counter");
        } else
        {
            counter = GameObject.Find("STINFO Counter 2");
        }
        
        renderer = GetComponent<Renderer>();
        materials = renderer.materials;
        materials[1] = clear;
        renderer.materials = materials;
        text = counter.GetComponentInChildren<TMP_Text>();
    }

    // Update is called once per frame
    void Update()
    {

    }

    void OnMouseEnter()
    {
        
        if (!alreadyClicked && text.text == "")
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