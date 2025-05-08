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
    public int starterClueID;
    public int clueID;
    bool go = false;
    private Renderer renderer;
    private Material[] materials;
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

        if (starterClueID == 1)
        {
            if ((DBManager.multipartCluesCompleted[0] == 1) || alreadyClicked)
            {
                alreadyClicked = true;
                //go = true;
            }
            /*
            else
            {
                alreadyClicked = false;
            }
            */
        }
        else if (starterClueID == 2)
        {
            if ((DBManager.multipartCluesCompleted[1] == 1) || alreadyClicked)
            {
                alreadyClicked = true;
                //go = true;
            }
            /*
            else
            {
                alreadyClicked = false;
            }
            */
        }
        else if (starterClueID == 4)
        {
            if ((DBManager.multipartCluesCompleted[2] == 1) || alreadyClicked)
            {
                alreadyClicked = true;
                //go = true;
            }
            /*
            else
            {
                alreadyClicked = false;
            }

            */
        }
        else if (starterClueID == 5)
        {
            if ((DBManager.multipartCluesCompleted[3] == 1))
            {
                alreadyClicked = true;
            } else if ((DBManager.cluesClicked[clueID - 1] == 1)) {
                alreadyClicked = true;
                script.alreadyClicked = true;
            }
        }
        
        //go = script.getAlrClk();
    }

    void OnMouseEnter()
    {
        go = script.getAlrClk();
        Debug.Log(go);
        if (starterClueID == 4)
        {
            if (!alreadyClicked && go && DBManager.multipartCluesCompleted[2] != 1)
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
        } else if (starterClueID == 5)
        {
            if (!alreadyClicked && go && DBManager.multipartCluesCompleted[3] != 1 && DBManager.cluesClicked[clueID - 1] != 1)
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
        } else { 
        
            if (!alreadyClicked && go && DBManager.multipartCluesCompleted[starterClueID - 1] != 1)
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
        /*
        if (!alreadyClicked && go)
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
        */



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
            Debug.Log("Already Clicked");
            alreadyClicked = true;
        }
        //Destroy(plane);
        //.Log("Over");
        //GameObject().Destroy;
        //GetComponent<Renderer>().material.color = new Color(1, 0, 0, 1);
    }
}