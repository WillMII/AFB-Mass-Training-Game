using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ConditionalGlow : MonoBehaviour
{
    private Color startColor;
    private bool alreadyClicked;
    //public GameObject plane;
    //public Material door;
    public Material tinted;
    public Material clear;
    //public var yellow;
    // Start is called before the first frame update
    public ActivateClue script;
    bool go = false;
    private Renderer renderer;
    private Material[] materials;
    public int clueIDAssociatedWith;
    void Start()
    {
        renderer = GetComponent<Renderer>();
        materials = renderer.materials;
        materials[1] = clear;
        renderer.materials = materials;
        bool go = script.getAlrClk();
    }

    // Update is called once per frame
    void Update()
    {
        //go = script.getAlrClk();
    }

    void OnMouseEnter()
    {
        go = script.getAlrClk();
        //Debug.Log("ConditionalGlow Click on Item: " + alreadyClicked);
        //Debug.Log("ConditionalGlow on Item: " + go);
        if (clueIDAssociatedWith == 2)
        {
            if ((!alreadyClicked) && go && (DBManager.multipartCluesCompleted[0] != 1))
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
        else if (clueIDAssociatedWith == 4)
        {
            Debug.Log("Clue 4 Clicked: " + go.ToString());
            if ((!alreadyClicked) && go && (DBManager.multipartCluesCompleted[1] != 1))
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
        else if (clueIDAssociatedWith == 8)
        {
            Debug.Log("Clue 4 Clicked: " + go.ToString());
            if ((!alreadyClicked) && go && (DBManager.multipartCluesCompleted[2] != 1))
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